import React from 'react'
import '../styles/p.css'
import { useNavigate } from 'react-router-dom'
const Profile = ({ state }) => {
    const navigate=useNavigate();
  return (
    <div className="cards-container">

        {state.records.length === 0 ? (
          <div className="empty-home">
            No data yet — start by adding records 
          </div>
        ) : (
          state.records.map((item, index) => (
            <div key={item.id} className={`card priority-${item.priority.toLowerCase()}`}>
              
              <div className="card-header">
                <h3>{item.name}</h3>
                <span className={`badge badge-${item.priority.toLowerCase()}`}>
                  {item.priority}
                </span>
              </div>

              <div className="card-body">
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Mobile:</strong> {item.mobile}</p>
                <p><strong>Date:</strong> {item.date}</p>
              </div>

              <div className="card-footer">
                <button onClick={() => navigate('/table')}>
                  View Table →
                </button>
              </div>

            </div>
          ))
        )}

      </div>
  )
}

export default Profile