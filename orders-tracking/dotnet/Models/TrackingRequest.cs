using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TrackingIntegration.Models
{
    public class TrackingRequest
    {
        public string Account { get; set; }
        public string Workspace { get; set; }
        public string AppName { get; set; }
        public Dictionary<string, string> Config { get; set; }
        
        [Required]
        public IEnumerable<Package> Packages { get; set; }
    }
}