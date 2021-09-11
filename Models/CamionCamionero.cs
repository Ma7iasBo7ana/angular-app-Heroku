namespace LogisticaAngular.Models
{
    public class CamionCamionero
    {
        public int CamionId { get; set; }
        public virtual Camion Camion { get; set; }

        public int CamioneroId { get; set; }
        public virtual Camionero Camionero { get; set; }
    }
}