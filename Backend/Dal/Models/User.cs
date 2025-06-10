using System.Text.Json.Serialization;

namespace Dal.Models;
public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Phone { get; set; } = "";
    [JsonIgnore]
    public ICollection<Prompt> Prompts { get; set; } = new List<Prompt>();
}
