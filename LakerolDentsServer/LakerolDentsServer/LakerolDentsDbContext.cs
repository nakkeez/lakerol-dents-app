using LakerolDentsServer.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LakerolDentsServer
{
    public class LakerolDentsDbContext(DbContextOptions<LakerolDentsDbContext> options)
        : IdentityDbContext<User>(options)
    {
        public virtual DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}

