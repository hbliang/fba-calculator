import { sizeTier, SMALL_STANDARD_SIZE, LARGE_STANDARD_SIZE, SMALL_OVERSIZE_SIZE, MEDIUM_OVERSIZE_SIZE, LARGE_OVERSIZE_SIZE, SPECIAL_OVERSIZE_SIZE, itemWeight } from "./sizeTier";

export const cost = (item) => {
    let weight = itemWeight(item)
    const size = sizeTier(item)

    if (size === SMALL_STANDARD_SIZE) {
        weight + 0.25
        if (weight <= 0.625) {
            return 2.50
        } else if (weight <= 1) {
            return 2.63
        }
    }

    if (size === LARGE_STANDARD_SIZE) {
        weight = Math.ceil(weight + 0.25)
        if (weight <= 0.625) {
            return 3.31
        } else if (weight <= 1) {
            return 3.48
        } else if (weight <= 2) {
            return 4.90
        } else if (weight <= 3) {
            return 5.42
        } else if (weight <= 21) {
            return 5.42 + (weight - 3) * 0.38
        }
    }

    if (size === SMALL_OVERSIZE_SIZE) {
        weight = Math.ceil(weight + 1)
        if (weight <= 71) {
            return 8.26 + (weight - 2) * 0.38
        }
    }

    if (size === MEDIUM_OVERSIZE_SIZE) {
        weight = Math.ceil(weight + 1)
        if (weight <= 151) {
            return 11.37 + (weight - 2) * 0.39
        }
    }

    if (size === LARGE_OVERSIZE_SIZE) {
        weight = Math.ceil(weight + 1)
        if (weight <= 151) {
            if (weight < 90) {
                return 75.78
            } else {
                return 75.78 + (weight - 90) * 0.79
            }
        }
    }

    if (size === SPECIAL_OVERSIZE_SIZE) {
        if (weight < 90) {
            return 137.32
        } else {
            return 137.32 + (weight - 90) * 0.91
        }
    }

    return null;
}
