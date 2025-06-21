import create from './create';
import deleteReview from './delete';

const reviewRepository = {
	create,
	delete: deleteReview,
};

export default reviewRepository;
