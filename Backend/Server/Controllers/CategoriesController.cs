using Bl.Interfaces;
using Bl.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryServiceBl _categoryService;
        public CategoriesController(IBl bl)
        {
            _categoryService = bl.CategoryService;
        }
        [HttpGet]
        public ActionResult<List<CategoryBl>> GetAllCategories()
        {
            var categories =  _categoryService.GetCategories();
            if (categories == null || categories.Count == 0)
            {
                return NotFound("No categories found.");
            }
            return Ok(categories);
        }
    }
}
