import categoriseReview from './categoriseReview.js';
import scrapeReviews from './scrapeReviews.js';
import { addReviews } from './services/reviewService.js';

const task = async () => {
    try {
        const reviews = await scrapeReviews();
        console.log(reviews);

        // Process each review asynchronously to add a category
        for (const review of reviews) {
            const category = await categoriseReview(review.description);
            review.category = category;
        }

        // Save the categorized reviews
        await addReviews(reviews);
    } catch (error) {
        console.error("Error processing reviews:", error);
    }
};

// Invoke the task function
export default task();
