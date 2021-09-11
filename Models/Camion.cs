using System.Collections.Generic;
namespace LogisticaAngular.Models
{
    public class Camion
    {
        public int Id { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Transmision { get; set; }
        public string Traccion { get; set; }
       // public virtual Motor Motor { get; set; }
       /*public int Id { get; set; }
        public string Marca { get; set; }

        
        public int CamionId { get; set; }

        public virtual  Camion Camion { get; set; }*/

         

        public virtual IEnumerable<CamionCamionero> CamionCamioneros { get; set; }
        
        
    }
}