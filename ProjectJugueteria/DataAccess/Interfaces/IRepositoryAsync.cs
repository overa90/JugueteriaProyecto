using System.Linq.Expressions;

namespace ProjectJugueteria.DataAccess.Interfaces
{
    public interface IRepositoryAsync<T> : IDisposable where T : class
    {
        Task<IEnumerable<T>> GetAll();

        Task<T> GetByID(int? id);

        Task<T> Insert(T entity);

        Task<T> Delete(int id);

        Task Update(T entety);

        Task<T> Find(Expression<Func<T,bool>> expr);

        void CreateBase();


    }

}
