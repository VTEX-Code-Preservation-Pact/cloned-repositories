import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';
import * as bcrypt from 'bcrypt';
import { PasswordCodes } from '../dtos/password_codes.enum';

const maxAttempts = 3;
const dueTime = 600000;
const loginTime = 60000;
const validateTime = 600000;

interface AuthAttrs {
  email: string;
}

export interface AuthDoc extends Document {
  email: string;
  password: string;
  attempts: number;
  validateLockedUntil: number;
  dueDate: number;
  loginLockedUntil: number;
  isLocked(): boolean;
  validatePassword(password: string): Promise<PasswordCodes>;
  isLockedValidate(): boolean;
}

export interface AuthModel extends Model<AuthDoc, AuthAttrs> {
  generatePassword(): string;
}

const AuthSchema = Schema.build({
  password: {
    type: String,
    required: true,
    set: async (password, old?) => {
      if (password !== old) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
      }
      return password;
    },
  },
  attempts: { type: Number, required: true, default: 0 },
  dueDate: {
    type: Number,
    required: true,
    default: () => Date.now() + dueTime,
  },
  loginLockedUntil: {
    type: Number,
    required: true,
    default: () => Date.now() + loginTime,
  },
  validateLockedUntil: Number,
  email: {
    type: String,
    required: true,
    index: { global: true, name: 'emailIndex' },
  },
});

export const Auth: ModelDefinition = {
  name: 'authentications',
  schema: AuthSchema,
  methods: {
    transform: (ret: AuthDoc) => {
      delete ret.password;
    },
    isLocked: function () {
      return Date.now() < this.loginLockedUntil || this.isLockedValidate();
    },
    isLockedValidate: function () {
      return Date.now() < this.validateLockedUntil;
    },
    validatePassword: async function (password: string) {
      if (this.isLockedValidate()) return PasswordCodes.locked;
      if (Date.now() > this.dueDate) return PasswordCodes.expired;
      this.attempts += 1;
      if (this.attempts >= maxAttempts) {
        this.attempts = 1;
        this.validateLockedUntil = Date.now() + validateTime;
      }
      if (await bcrypt.compareSync(password, this.password))
        return PasswordCodes.valid;
      return PasswordCodes.invalid;
    },
  },
  statics: {
    generatePassword: () => {
      return String(Math.floor(100000 + Math.random() * 900000));
    },
  },
};
