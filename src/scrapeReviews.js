import gplay from 'google-play-scraper';

const BATCH_SIZE = 150; // Maximum reviews per page with pagination
const DEFAULT_DAYS = 3; // Default days to fetch if no startTime is provided

// Helper function to check if a review date is newer than the specified start time
const isNewerThan = (date, startTime) => {
    return date > startTime;
};

// Function to fetch reviews newer than a given time, or default to last three days if no time provided
const fetchReviewsSince = async (appId, startTime = null) => {
    const now = new Date();
    const start = startTime ? new Date(startTime) : new Date(now.setDate(now.getDate() - DEFAULT_DAYS));

    let collectedReviews = [];
    let nextToken = null;

    while (true) {
        try {
            // Fetch a batch of reviews with pagination
            const reviews = await gplay.reviews({
                appId,
                sort: gplay.sort.NEWEST,
                paginate: true,
                nextPaginationToken: nextToken, // Pass the token for the next page
            });

            // Filter reviews to get only those newer than the specified start time
            const filteredReviews = reviews.data
                .filter((review) => isNewerThan(new Date(review.date), start))
                .map((review) => ({
                    storeReviewId: review.id,
                    date: new Date(review.date),
                    ratings: review.score,
                    username: review.userName,
                    title: review.title || '', // Provide empty string if title is missing
                    description: review.text || '', // Provide empty string if description is missing
                    likes: review.thumbsUp || 0, // Default to 0 if likes is missing
                }));

            collectedReviews.push(...filteredReviews);

            // Stop if there are no more reviews from the desired period or no more pagination token
            const lastReviewDate = new Date(reviews.data[reviews.data.length - 1].date);
            if (!isNewerThan(lastReviewDate, start) || !reviews.nextPaginationToken) {
                break;
            }

            // Update the token for the next batch
            nextToken = reviews.nextPaginationToken;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            break;
        }
    }

    return collectedReviews;
};

const scrapeReviews = async () => {
    const appId = 'com.superplaystudios.dicedreams';
    const startTime = null; // Provide a date string to fetch reviews from a specific time, or leave null for the last 3 days

    return await fetchReviewsSince(appId, startTime);
};

export default scrapeReviews;
