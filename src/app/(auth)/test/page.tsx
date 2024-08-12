"use client"
import { useState, useEffect } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/test');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    }
    fetchUsers();
  }, [response]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = editId 
        ? await fetch(`/api/test/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, email }),
          })
        : await fetch('/api/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, email }),
          });

      if (res.ok) {
        const data = await res.json();
        setResponse(data);
        setError(null);
        setName('');
        setAge('');
        setEmail('');
        setEditId(null);
      } else {
        const err = await res.json();
        setError(err.message || 'An error occurred');
        setResponse(null);
      }
    } catch (err) {
      setError('An error occurred while submitting the form');
      setResponse(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/test/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const data = await res.json();
        setResponse(data);
        setError(null);
      } else {
        const err = await res.json();
        setError(err.message || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred while deleting the user');
    }
  };

  const handleEdit = (user: any) => {
    setName(user.name);
    setAge(user.age);
    setEmail(user.email);
    setEditId(user.id);
  };

  return (
    <div>
      <h1>Users Management</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">{editId ? 'Update' : 'Create'}</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <h2>Users List</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.name} ({user.age}) - {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
