﻿using System;
using System.IO;
using System.Net;

namespace service.Util.Exceptions
{
    public class InvalidHttpResponseException : Exception
    {
        public HttpStatusCode StatusCode { get; set; }

        public InvalidHttpResponseException(string? message, HttpStatusCode StatusCode) : base(message)
        {
            this.StatusCode = StatusCode;
        }

        public InvalidHttpResponseException(string? message, HttpStatusCode StatusCode, Exception? innerException) : base(message, innerException)
        {
            this.StatusCode = StatusCode;
        }
    }
}