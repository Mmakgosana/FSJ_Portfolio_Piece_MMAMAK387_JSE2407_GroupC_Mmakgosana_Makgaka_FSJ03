const DeleteReviewButton = ({ productId, reviewId, onReviewDeleted }) => {
    const [message, setMessage] = useState('');
  
    const handleDelete = async () => {
      const response = await fetch('/api/reviews/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, reviewId }),
      });
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message);
        onReviewDeleted(); // Call the parent function to refresh reviews
      } else {
        setMessage(data.error);
      }
    };
  
    return (
      <div>
        <button onClick={handleDelete}>Delete Review</button>
        {message && <p>{message}</p>}
      </div>
    );
  };
  
  export default DeleteReviewButton;
  