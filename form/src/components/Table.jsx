import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 }

export default function Table({ state, dispatch }) {
  const navigate = useNavigate()

  const [sortDir, setSortDir] = useState('asc')
  const [filter, setFilter] = useState('All')

 
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  // FILTER
  const filtered =
    filter === 'All'
      ? state.records
      : state.records.filter(r => r.priority === filter)

  // SORT
  const sorted = [...filtered].sort((a, b) => {
    const diff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
    return sortDir === 'asc' ? diff : -diff
  })


  const totalPages = Math.ceil(sorted.length / rowsPerPage)

  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = sorted.slice(startIndex, startIndex + rowsPerPage)

  return (
    <div className="table-card">

  
      <div className="table-header">
        <h2>Records</h2>
        <span className="record-count">
          {filtered.length} entries
        </span>
      </div>

  
      <div className="filter-bar">
        {['All', 'High', 'Medium', 'Low'].map(p => (
          <button
            key={p}
            className={`filter-btn ${filter === p ? 'active' : ''}`}
            onClick={() => {
              setFilter(p)
              setCurrentPage(1) // reset page
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* SORT */}
      <div className="sort-bar">
        <button
          className={`sort-btn ${sortDir === 'asc' ? 'active' : ''}`}
          onClick={() => setSortDir('asc')}
        >
          High → Low
        </button>
        <button
          className={`sort-btn ${sortDir === 'desc' ? 'active' : ''}`}
          onClick={() => setSortDir('desc')}
        >
          Low → High
        </button>
      </div>

      {/* TABLE */}
      {paginatedData.length === 0 ? (
        <div className="empty-state">
          <p onClick={() => navigate('/add')} style={{ cursor: "pointer" }}>
            No records yet. Click to add 
          </p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((r, i) => (
              <tr key={r.id}>
                <td>{startIndex + i + 1}</td>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.mobile}</td>
                <td>{r.date}</td>
                <td>{r.priority}</td>

                <td>
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => {
                      dispatch({ type: 'SET_EDIT', id: r.id })
                      navigate('/add')
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-icon btn-delete"
                    onClick={() => dispatch({ type: 'DELETE', id: r.id })}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            ← Prev
          </button>

          <span>
            Page {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next →
          </button>
        </div>
      )}

    </div>
  )
}