using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LogisticaAngular.Models
{
    public class Camionero
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Domicilio { get; set; }
        public int Telefono { get; set; }
        public double Salario { get; set; }

        public virtual IEnumerable<CamionCamionero> CamionCamioneros { get; set; }
        [JsonIgnore]
        public virtual IEnumerable<Paquete> Paquetes { get; set; }

        
    }
}