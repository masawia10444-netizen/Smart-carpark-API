const { getConfig } = require('../data/repositories/config.repo');

/**
 * Calculate parking fee based on entry and exit time using configuration rules
 * @param {string} entryAt - ISO format date string
 * @param {string} exitAt - ISO format date string (current time if not provided)
 * @param {Array} pricingRules - Array of rule objects [{hourStart, hourEnd, price, vehicleType, serviceType}]
 * @param {Object} options - { vehicleType, serviceType }
 */
function calculateFee(entryAt, exitAt, pricingRules = [], { vehicleType = 'car', serviceType = 'parking' } = {}) {
  const start = new Date(entryAt);
  const end = exitAt ? new Date(exitAt) : new Date();
  const diffMs = end - start;
  
  if (diffMs < 0) return 0;

  // Calculate total hours, rounded up (e.g., 1 hr 1 min = 2 hours)
  const totalHours = Math.ceil(diffMs / (1000 * 60 * 60));
  
  // Filter rules for this specific vehicle and service
  const relevantRules = pricingRules
    .filter(r => r.vehicleType === vehicleType && r.serviceType === serviceType && r.status === 'active')
    .sort((a, b) => a.hourStart - b.hourStart);

  let totalAmount = 0;
  
  for (let h = 1; h <= totalHours; h++) {
    // Find a rule that covers this specific hour
    const rule = relevantRules.find(r => h >= r.hourStart && (r.hourEnd === null || h <= r.hourEnd || r.hourEnd === 999));
    if (rule) {
      totalAmount += Number(rule.price);
    } else {
      // Default price if no rule found (e.g., 20 THB/hr)
      totalAmount += 20;
    }
  }

  return {
    totalHours,
    totalAmount,
    durationMs: diffMs
  };
}

module.exports = { calculateFee };
