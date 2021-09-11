using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LogisticaAngular.Models
{
    public partial class LogisticaDbContext : DbContext
    {
        public DbSet<Camion> camiones {get;set;}
        public DbSet<Camionero> camioneros {get;set;}
        public DbSet<CamionCamionero> CamionCamioneros {get;set;}
        public DbSet<Paquete> Paquetes {get;set;}
        public DbSet<Provincia> Provincias {get;set;}
        public DbSet<User> Usuarios {get;set;}
        public LogisticaDbContext()
        {
        }

        public LogisticaDbContext(DbContextOptions<LogisticaDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                //optionsBuilder.UseSqlServer("server=DESKTOP-S19U7DR;database=Logistica;trusted_connection=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //OnModelCreatingPartial(modelBuilder);
            //modelBuilder.Entity<Camion>().HasOne(b => b.Motor).WithOne(i => i.Camion).HasForeignKey<Motor>(b => b.CamionId);
            modelBuilder.Entity<CamionCamionero>().HasKey(cc=> new {cc.CamionId,cc.CamioneroId});
            modelBuilder.Entity<CamionCamionero>().HasOne<Camion>(cc=> cc.Camion).WithMany(c=>c.CamionCamioneros).HasForeignKey(cc=>cc.CamionId);
            modelBuilder.Entity<CamionCamionero>().HasOne<Camionero>(cc=> cc.Camionero).WithMany(a=>a.CamionCamioneros).HasForeignKey(cc=>cc.CamioneroId);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}