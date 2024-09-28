using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;

namespace BassilApi.Models
{
    public class Book
    {
        public int BookId {get; set;}
        public string? Url {get; set;}
        public string? Title{get; set;}
        public string? Description {get; set;}
        public string? CoverImage{get; set;}
        public int Chapters { get; set; }
        public int Pages { get; set; }

    }
}