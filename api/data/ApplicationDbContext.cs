using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using BassilApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BassilApi.data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        private readonly IServiceProvider _serviceProvider;
        public ApplicationDbContext(DbContextOptions dbOptions, IServiceProvider serviceProvider) : base(dbOptions)
        {
            _serviceProvider = serviceProvider;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }


        protected override  void OnModelCreating(ModelBuilder modelBuilder){
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Lecture>()
                .HasOne(x => x.Course)
                .WithMany(y => y.Lectures)
                .HasForeignKey(fk => fk.CourseId);

        }

        public DbSet<ApplicationUser> ApplicationUsers {get; set;}
        public DbSet<Lecture> Lectures{get; set;}
        public DbSet<Book> Books {get; set;}
        public DbSet<Article> Articles {get; set;}
        public DbSet<Course>  Courses { get; set; }

    }
}

