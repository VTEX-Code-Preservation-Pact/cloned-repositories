using System.Runtime.Serialization;

namespace service.Models.HealthCheck
{
    [DataContract]
    public class HealthCheckResponse
    {
        public HealthCheckResponse()
        {
            Installed = true;
        }

        [DataMember(Name = "installed")] public bool Installed { get; set; }
    }
}