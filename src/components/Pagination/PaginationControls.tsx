import React from "react"

interface PaginationControlsProps{
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number

}

const PaginationControls:React.FC<PaginationControlsProps> = ({
  page,
  setPage,
  totalPages
}) => {
  return (
    <div className="flex gap-3 mt-4">
    <button 
      onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
      disabled={page === 1}
      className="px-4 py-2 border rounded disabled:opacity-50"
    >
      Previous
    </button>

    <span>Page {page} of {totalPages}</span>

    <button 
      onClick={() => setPage((prev: number) => Math.min(prev + 1, totalPages))}
      disabled={page === totalPages}
      className="px-4 py-2 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
  )
}

export default PaginationControls