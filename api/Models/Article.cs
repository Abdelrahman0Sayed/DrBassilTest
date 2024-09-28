using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BassilApi.Models
{
    public class Article
    {

        public int ArticleId {get; set;}

        public string? ArticleImage {get; set;}

        public string? ArticleUrl {get; set;}
        
        [MaxLength(100)]
        public string? Title {get; set;}

        public string? Description {get; set;}
    }
}