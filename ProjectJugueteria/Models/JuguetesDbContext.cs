using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.SqlServer.Infrastructure.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace ProjectJugueteria.Models
{
    public partial class JuguetesDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public JuguetesDbContext()
        {
        }

        public JuguetesDbContext(DbContextOptions<JuguetesDbContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration; 
        }

        public virtual DbSet<Producto> Productos { get; set; } = null!;



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("conexion"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            List<Producto> listProducto = new List<Producto>();
            listProducto.Add(new Producto() { Id = 1, Nombre = "Helicoptero", Descripcion = "Helicoptero marinos", Edad = 12, Compania = "Matel", Precio = Convert.ToDecimal(655.00) });
            listProducto.Add(new Producto() { Id = 2, Nombre = "Carrito", Descripcion = "carrito deportivo", Edad = 13, Compania = "Duramil", Precio = Convert.ToDecimal(105.00) });

            modelBuilder.Entity<Producto>(producto =>
            {
                producto.ToTable("Producto");
                producto.HasKey(p => p.Id);
                producto.Property(p => p.Nombre).IsRequired(true).HasMaxLength(50);
                producto.Property(p => p.Descripcion).IsRequired(false).HasMaxLength(100);
                producto.Property(p => p.Edad);
                producto.Property(p => p.Compania).IsRequired(false).HasMaxLength(50);
                producto.Property(p => p.Precio).IsRequired(true);
                producto.HasData(listProducto);
            }
            );
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
