namespace LakerolDentsServer.Models
{
    /// <summary>
    /// Request object for filtering Läkeröl Dents products.
    /// </summary>
    public class GetProductsRequest
    {
        public string? NameContains { get; set; }
        public int? PackageSize { get; set; }
        public int? MaxEnergyKcal { get; set; }

    }
}
