using LakerolDentsServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LakerolDentsServer.Controllers
{
    /// <summary>
    /// Controller for the Läkerol Dents products.
    /// </summary>
    /// <param name="dbContext"></param>
    /// <param name="logger"></param>
    [Route("api")]
    [ApiController]
    [Authorize]
    public class ProductController(LakerolDentsDbContext dbContext, ILogger<ProductController> logger)
        : ControllerBase
    {
        private readonly ILogger<ProductController> _logger = logger;

        /// <summary>
        /// Get all Läkeröl Dents products.
        /// Optionally filter by name, package size and maximum energy content.
        /// </summary>
        /// <param name="request">Request object with optional filter parameters.</param>
        /// <returns>HTTP response with an array of products matching the filters.</returns>
        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] GetProductsRequest request)
        {
            var nameContains = request.NameContains ?? "";
            var packageSize = request.PackageSize;
            var maxEnergyKcal = request.MaxEnergyKcal;

            var query = dbContext.Products
                .Where(p => p.Name.Contains(nameContains));

            if (maxEnergyKcal.HasValue)
            {
                query = query.Where(p => p.EnergyKcal <= maxEnergyKcal);
            }
            
            if (packageSize.HasValue)
            {
                query = query.Where(p => p.PackageSize == packageSize);
            }

            var products = await query.ToArrayAsync();
            return Ok(products);
        }

        /// <summary>
        /// Get a Läkeröl Dents product by its EAN code if it exists.
        /// </summary>
        /// <param name="eanCode">The EAN code of the product.</param>
        /// <returns>HTTP response with the product matching the EAN code if exists. Otherwise, 404 Not Found.</returns>
        [HttpGet("{eanCode}")]
        public async Task<IActionResult> GetProductByEanCode(string eanCode)
        {
            var product = await dbContext.Products.FirstOrDefaultAsync(e => e.EanCode == eanCode);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
    }
}