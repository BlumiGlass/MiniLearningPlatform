using Bl.Models;
using Dal.Models;

namespace Bl.Interfaces;

public interface ICategoryServiceBl
{
    List<CategoryBl> GetCategories();
}
