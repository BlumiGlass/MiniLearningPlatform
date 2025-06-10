using System.Text.Json.Serialization;

namespace Dal.Models;
public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    [JsonIgnore]
    public ICollection<SubCategory> SubCategories { get; set; } = new List<SubCategory>();
}
