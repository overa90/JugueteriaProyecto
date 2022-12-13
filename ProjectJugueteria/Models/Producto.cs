using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectJugueteria.Models
{
    public partial class Producto
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; } = null!;

        [MaxLength(100)]
        public string? Descripcion { get; set; }

        [Range(1, 100)]
        public int Edad { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Compania { get; set; }

        [Required]
        [Range(1, 1000)]
        public decimal Precio { get; set; }
    }
}
