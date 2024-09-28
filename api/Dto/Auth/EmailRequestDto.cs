using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BassilApi.Dto.Auth
{
    public class EmailRequestDto
    {
        public string? ToEmail {get; set;}
        public string? Subject { get; set; }
        public string? Confirmation {get; set;}
        public List<IFormFile>? Attachments{get; set;}
    }
}