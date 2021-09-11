using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace LogisticaAngular.Models
{
    public class Provincia
    {
        public int Id { get; set; }
        public string Nombre { get; set; }

        [JsonIgnore]
        public virtual IEnumerable<Paquete> Paquetes { get; set; }
    }
}