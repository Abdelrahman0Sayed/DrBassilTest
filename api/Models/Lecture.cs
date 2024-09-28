using api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BassilApi.Models
{
    public class Lecture
    {
        public int LectureId {get; set;}
        public string? LectureName {get; set;}
        public string? Url {get; set;}


        public int CourseId {get; set;}
        public Course? Course {get; set;}
    }
}