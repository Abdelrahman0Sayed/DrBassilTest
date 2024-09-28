using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BassilApi.Dto.Auth
{
    public class AuthResponse
    {
        public string? Messages{get; set;}
        public string? Token {get; set;}
        public DateTime? ExpiresOn {get; set;} = DateTime.Now.AddDays(7);
    }
}