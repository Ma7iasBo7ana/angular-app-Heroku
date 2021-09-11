namespace LogisticaAngular.Models
{
    public class Paquete
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public string Destinatario { get; set; }
        public string DireccionDestinatario { get; set; }
        public bool Entregado { get; set; }

        public virtual Camionero Camionero { get; set; }
        public virtual Provincia Provincia { get; set; }
    }
}