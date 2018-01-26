using System;

namespace Triggr.Services
{
    public class RepositoryStorage : IStorage
    {
        private string _path;
        public string Path => _path;
        public RepositoryStorage(string path)
        {
            Set(path);
        }
        public void Set(string path)
        {
            Set(path, true);
        }

        public void Set(string path, bool environmentPath)
        {
            _path = environmentPath ? System.IO.Path.Combine(Environment.CurrentDirectory, path) : path;
        }
        public string Combine(string path)
        {
            return System.IO.Path.Combine(_path, path);
        }
    }
}