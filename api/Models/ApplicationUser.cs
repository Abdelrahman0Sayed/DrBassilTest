using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace BassilApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(200)]
        public string? StudentName {get; set;}
        public string? UserRole { get; set; }
    }
}