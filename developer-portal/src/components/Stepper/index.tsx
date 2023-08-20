import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';


const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#F71963"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#F71963"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#F71963"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#F71963",
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding:"30px",
    borderRadius:"10px"
  },
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: "#fff",
    border: "0px solid #f9f9f9",
    color: "#142032",
    "&:hover": {
      backgroundColor: "#142032",
      color: "#fff",
    }
  },
  title:{
    marginBottom:"20px",
    fontWeight: "bold"
  },
  instructions:{
    marginBottom:"20px"
  }
}));

function getSteps() {
  return [
    "Develop a new feature",
    "Open a Pull Request",
    'Get a preview of your store',
    "Check CI test results",
    "Run your own QA tests",
    "Publish your changes"
  ];
}

function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return 'Develop your new feature using your favorite tech stack.';
    case 1:
      return 'Open a Pull Request on GitHub.';
    case 2:
      return 'Our bots will generate a preview of your site.';
    case 3:
      return "Our QA robots will evaluate code quality and your site's performance.";
    case 4:
      return 'The QA team will check...';
    case 5:
      return 'Once..., publish your changes.';
      
      default:
      return 'Unknown stepIndex';
  }
}


export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root} >
      <Stepper  style={{ backgroundColor: "#fff", marginBottom:"30px", borderRadius:"10px"}}
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          <div>
            <Button onClick={handleReset} className={classes.button}>
              Done
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>            
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
