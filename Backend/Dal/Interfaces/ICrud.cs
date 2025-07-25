﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Interfaces;

public interface ICrud<T>
{
    T Create(T entity);
    T Read(int id);
    List<T> ReadAll();
    T Update(T entity);
    void Delete(int id);
}
