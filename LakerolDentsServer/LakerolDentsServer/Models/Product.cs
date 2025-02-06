using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace LakerolDentsServer.Models
{
    public partial class EanCodeAttribute : ValidationAttribute
    {
        private static string GetErrorMessage()
        {
            return "EanCode must be exactly 13 characters long and only include numbers.";
        }
        
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is not string eanCode || !EanCodeRegex().IsMatch(eanCode))
            {
                return new ValidationResult(GetErrorMessage());
            }
            return ValidationResult.Success;
        }

        // Pattern to check that string is 13 digits long
        [GeneratedRegex(@"^\d{13}$")]
        private static partial Regex EanCodeRegex();
    }
    
    /// <summary>
    /// Model for a Läkeröl Dents product in a database.
    /// </summary>
    [Table("product")]
    public class Product
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; init; }

        [Required]
        [EanCode]
        [StringLength(13, MinimumLength = 13)]
        public required string EanCode { get; init; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(255)]
        public required string Name { get; init; }

        [Required]
        public int PackageSize { get; init; }

        /// <summary>
        /// Energy in kilojoules per 100g
        /// </summary>
        [Required]
        public int EnergyKj { get; init; }
        
        /// <summary>
        /// Energy in kilocalories per 100g
        /// </summary>
        [Required]
        public int EnergyKcal { get; init; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(1000)]
        public required string Description { get; init; }

        /// <summary>
        /// URL to image of product
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(255)]
        public required string Image { get; init; }
    }
}

