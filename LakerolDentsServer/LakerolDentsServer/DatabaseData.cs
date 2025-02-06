using LakerolDentsServer.Models;
using Microsoft.EntityFrameworkCore;

namespace LakerolDentsServer
{
    /// <summary>
    /// Class for migrating and seeding the Läkeröl Dents database.
    /// </summary>
    public class DatabaseData
    {
        /// <summary>
        /// Migrate and seed the database with initial data.
        /// </summary>
        /// <param name="serviceProvider">Service provider for the database context.</param>
        public static void MigrateAndSeed(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<LakerolDentsDbContext>();
            context.Database.Migrate();

            if (context.Products.Any()) return;
            var products = new List<Product>
            {
                new()
                {
                    EanCode = "6420256012512",
                    Name = "Läkeröl Dents Apple Fresh White",
                    PackageSize = 36,
                    EnergyKj = 1115,
                    EnergyKcal = 268,
                    Description = "Läkerol Apple Fresh White pastilles taste of fresh green apple and lemon balm. In addition to xylitol, the pastilles contain a mix of baking soda, calcium carbonate and green tea extract, which is also commonly used in toothpastes. The pastilles have a unique soft and chewy consistency.  Using pastilles that contain xylitol and maltitol helps maintain tooth remineralisation. Remineralisation refers to the hardening of enamel. Pastilles are recommended by the Finnish Dental Association.",
                    Image = "https://lakeroldentsapp.blob.core.windows.net/lakeroldentscontainer/fresh-apple.jpg"
                },
                new()
                {
                    EanCode = "6420256016909",
                    Name = "Läkeröl Dents Raspberry Salmiak",
                    PackageSize = 36,
                    EnergyKj = 1097,
                    EnergyKcal = 268,
                    Description = "Läkerol Dents pastilles are the most delicious way of taking care of your teeth! Läkerol Dents Raspberry Salmiak xylitol pastilles are a flavorfull combination of raspberry and salmiak with a pleasant chewy texture. The small pack size is easy to carry on the go and enjoy after a meal.",
                    Image = "https://lakeroldentsapp.blob.core.windows.net/lakeroldentscontainer/raspberry-salmiak.jpg"
                },
                new()
                {
                    EanCode = "6420256016299",
                    Name = "Läkerol Dents Sweet Mango",
                    PackageSize = 85,
                    EnergyKj = 1140,
                    EnergyKcal = 274,
                    Description = "A delicious way to take care of your teeth! Läkerol Dents Sweet Mango xylitol pastilles have a taste of sweet mango with a hint of freshness from lime. Läkerol Dents is a soft chewy xylitol pastille, which tastes great and takes good care or your teeth. These pastilles are packed with xylitol and recommended by the Finnish Dental Association.",
                    Image = "https://lakeroldentsapp.blob.core.windows.net/lakeroldentscontainer/sweet-mango.jpg"
                },
                new()
                {
                    EanCode = "6420256013519",
                    Name = "Läkerol Dents Menthol",
                    PackageSize = 85,
                    EnergyKj = 1145,
                    EnergyKcal = 275,
                    Description = "Läkerol Dents Menthol is a traditional menthol-flavoured xylitol pastille.  The pastilles have a unique soft and chewy consistency. Using pastilles that contain xylitol and maltitol helps maintain tooth remineralisation. Remineralisation refers to the hardening of enamel. Pastilles are recommended by the Finnish Dental Association.",
                    Image = "https://lakeroldentsapp.blob.core.windows.net/lakeroldentscontainer/menthol-85.jpg"
                },
                new()
                {
                    EanCode = "6420256012918",
                    Name = "Läkerol Dents Licorice Vanilla",
                    PackageSize = 85,
                    EnergyKj = 1139,
                    EnergyKcal = 273,
                    Description = "Läkerol Dents Licorice Vanilla is a delicious liquorice and vanilla-flavoured xylitol pastille. The pastilles have a unique soft and chewy consistency. Using pastilles that contain xylitol and maltitol helps maintain tooth remineralisation. Remineralisation refers to the hardening of enamel. Pastilles are recommended by the Finnish Dental Association.",
                    Image = "https://lakeroldentsapp.blob.core.windows.net/lakeroldentscontainer/licorice-vanilla.jpg"
                },
                new()
                {
                    EanCode = "6420256012901",
                    Name = "Läkerol Dents Strawberry Cream",
                    PackageSize = 85,
                    EnergyKj = 1134,
                    EnergyKcal = 272,
                    Description = "Läkerol Dents Strawberry Cream pastilles combine strawberry flavour with a hint of rich creaminess. The pastilles have a unique soft and chewy consistency. Using pastilles that contain xylitol and maltitol helps maintain tooth remineralisation. Remineralisation refers to the hardening of enamel. Pastilles are recommended by the Finnish Dental Association.",
                    Image = "https://lakeroldentsapp.blob.core.windows.net/lakeroldentscontainer/strawberry-cream.jpg"
                },
                new()
                {
                    EanCode = "6420256001523",
                    Name = "Läkerol Dents Menthol",
                    PackageSize = 36,
                    EnergyKj = 1118,
                    EnergyKcal = 269,
                    Description = "Läkerol Dents Menthol is a traditional menthol-flavoured xylitol pastille.  The pastilles have a unique soft and chewy consistency. Using pastilles that contain xylitol and maltitol helps maintain tooth remineralisation. Remineralisation refers to the hardening of enamel. Pastilles are recommended by the Finnish Dental Association.",
                    Image = "https://lakeroldentsapp.blob.core.windows.net/lakeroldentscontainer/menthol-36.jpg"
                },
                new()
                {
                    EanCode = "6420256002131",
                    Name = "Läkerol Dents Sweetmint",
                    PackageSize = 36,
                    EnergyKj = 1131,
                    EnergyKcal = 271,
                    Description = "Läkerol Dents Sweetmint has a soft minty taste. The pastilles have a unique soft and chewy consistency. Using pastilles that contain xylitol and maltitol helps maintain tooth remineralisation. Remineralisation refers to the hardening of enamel. Pastilles are recommended by the Finnish Dental Association.",
                    Image = "https://lakeroldentsapp.blob.core.windows.net/lakeroldentscontainer/sweet-mint.jpg"
                },
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}

