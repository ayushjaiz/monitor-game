import scrapeReviews from './scrapeReviews.js'
import { addReviews } from './services/reviewService.js';

const temp = async () => {
    const reviews = await scrapeReviews();

    await addReviews(reviews);
}

temp();
