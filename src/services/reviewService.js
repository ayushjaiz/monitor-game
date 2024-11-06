import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Creates reviews in bulk.
 * @param {Array} reviews - An array of review objects to be inserted.
 * @returns {Promise<Array>} - The array of created reviews.
 */
const addReviews = async (reviews) => {
    try {
        const createdReviews = await prisma.review.createMany({
            data: reviews,
            skipDuplicates: true // Avoids duplicates based on unique fields like storeReviewId
        });
        console.log(`${createdReviews.count} reviews added successfully.`);
        return createdReviews;
    } catch (error) {
        console.error('Error creating reviews in bulk:', error);
        throw error;
    }
};

/**
 * Retrieves reviews based on optional filters for date range and category.
 * @param {Date} startDate - The start date for the date range filter.
 * @param {Date} endDate - The end date for the date range filter.
 * @param {String} category - The category filter (e.g., "BUGS", "COMPLAINTS").
 * @returns {Promise<Array>} - The array of retrieved reviews.
 */
const getAllReviews = async (startDate = null, endDate = null, category = null) => {
    try {
        const filters = {};

        // Add date range filter if startDate and endDate are provided
        if (startDate && endDate) {
            filters.date = {
                gte: startDate,
                lte: endDate
            };
        }

        // Add category filter if a category is provided
        if (category) {
            filters.category = category;
        }

        // Retrieve all reviews matching the filters
        const reviews = await prisma.review.findMany({
            where: filters,
            orderBy: {
                date: 'desc'
            }
        });
        return reviews;
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        throw error;
    }
};

export {
    addReviews,
    getAllReviews,
}

