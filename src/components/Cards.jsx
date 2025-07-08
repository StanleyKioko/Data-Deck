import React from 'react'

const Cards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-2">Card Title 1</h2>
        <p className="text-gray-600">This is a description for card 1.</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-2">Card Title 2</h2>
        <p className="text-gray-600">This is a description for card 2.</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-2">Card Title 3</h2>
        <p className="text-gray-600">This is a description for card 3.</p>
      </div>
    </div>
  )
}

export default Cards
