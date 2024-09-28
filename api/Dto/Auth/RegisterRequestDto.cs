using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BassilApi.Dto.Auth
{
    public class RegisterRequestDto
    {
        [Required]
        public string? StudentName {get; set;}
        
        [Required]
        public string? Email {get; set;}
        
        [Required]
        public string? Password {get; set;}
    }
}