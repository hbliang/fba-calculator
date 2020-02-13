export const STANDARD_SIZE = 'standard-size';
export const OVERSIZE_SIZE = 'oversize-size';
export const SMALL_STANDARD_SIZE = 'small-standard-size';
export const LARGE_STANDARD_SIZE = 'large-standard-size';
export const SMALL_OVERSIZE_SIZE = 'small-oversize-size';
export const MEDIUM_OVERSIZE_SIZE = 'medium-oversize-size';
export const LARGE_OVERSIZE_SIZE = 'large-oversize-size';
export const SPECIAL_OVERSIZE_SIZE = 'special-oversize-size';


// For standard-size products that weigh 1 lb or less, and for special oversize products, use the unit weight. For all other products, use the larger of either the single unit weight or the dimensional weight. The dimensional weight is equal to the unit volume (length x width x height) divided by 139. The dimensional weight for oversize items assumes a minimum width and height of 2 inches.

// To calculate the length plus girth:
// Measure the length, height, and width of the packaged unit.
// Calculate the girth by adding the shortest and median sides and multiplying by 2.
// Add the longest side and girth.
export const sizeTier = (item) => {
    const weight = itemWeight(item)
    const [shortest, median, longest] = sort(item)
    const lengthPlusGirth = calculateLengthPlusGirth(item);
    if (weight <= 1 && longest <= 15 && median <= 12 && shortest <= 0.75) {
        return SMALL_STANDARD_SIZE;
    }
    if (weight <= 20 && longest <= 18 && median <= 14 && shortest <= 8) {
        return LARGE_STANDARD_SIZE;
    }
    if (weight <= 70 && longest <= 60 && median <= 30 && lengthPlusGirth <= 130) {
        return SMALL_OVERSIZE_SIZE;
    }
    if (weight <= 150 && longest <= 108 && lengthPlusGirth <= 130) {
        return MEDIUM_OVERSIZE_SIZE;
    }
    if (weight <= 150 && longest <= 108 && lengthPlusGirth <= 165) {
        return LARGE_OVERSIZE_SIZE;
    }

    return SPECIAL_OVERSIZE_SIZE;
}

export const isStandardSize = (item) => {
    const [shortest, median, longest] = sort(item)

    if (item.weight <= 20 && shortest <= 8 && median <= 14 && longest <= 18) {
        return true
    }
    return false
}


// The special oversize tier applies to products that must be delivered using special delivery options due to their size, weight, special handling requirements, or other restrictions.
// Products are classified and charged as special oversize if any of the following is true:
// Dimensions are greater than 108 inches on the longest side
// Unit weight or dimensional weight is greater than 150 lb
// Length + girth is greater than 165 inches
// Amazon has determined that the product requires special handling to ensure a good customer experience
export const isSpecialOversize = (item) => {
    const [shortest, median, longest] = sort(item)
    if (longest > 108 || (item.weight > 150 || calculateDimensionalWeight(item) > 150) || calculateLengthPlusGirth(item) > 165) {
        return true;
    }

    return false;
}

const sort = ({ length, width, height } = item) => {
    const sides = [length, width, height]
    sides.sort((a, b) => a - b)
    return sides
}

export const itemWeight = (item) => {
    return (isStandardSize(item) && item.weight <= 1) || isSpecialOversize(item) ? item.weight : Math.max(calculateDimensionalWeight(item), item.weight)
}

// The dimensional weight is equal to the unit volume (length x width x height) divided by 139.
export const calculateDimensionalWeight = ({ length, width, height } = item) => {
    return length * width * height / 139;
}

export const calculateLengthPlusGirth = (item) => {
    const [shortest, median, longest] = sort(item)
    return longest + (shortest + median) * 2
}
