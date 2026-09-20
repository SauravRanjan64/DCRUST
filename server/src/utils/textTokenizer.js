const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot',
  'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each',
  'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d',
  'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i',
  'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s',
  'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll',
  'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll',
  'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while',
  'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll',
  'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves', 'experience', 'knowledge', 'working', 'skills',
  'years', 'proficient', 'understanding', 'familiar', 'work', 'good', 'ability', 'responsible', 'project', 'projects'
]);

/**
 * Tokenizes text, converts to lowercase, strips punctuation, removes stop words, and normalizes
 * @param {string} text 
 * @returns {string[]} unique normalized tokens
 */
export function tokenizeText(text) {
  if (!text || typeof text !== 'string') return [];

  // Normalize lowercase
  const lower = text.toLowerCase();

  // Replace punctuation except letters, numbers, and common skill symbols (like c++, c#, .net, node.js)
  const cleaned = lower
    .replace(/[^a-z0-9+#\.\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleaned.split(' ');
  const filtered = words.filter(word => word.length > 1 && !STOP_WORDS.has(word));

  return Array.from(new Set(filtered));
}

/**
 * Normalizes a skill name for deterministic comparison
 * e.g., "Node.js" -> "nodejs", "React.js" -> "react", "C++" -> "c++"
 */
export function normalizeSkill(skill) {
  if (!skill || typeof skill !== 'string') return '';
  return skill.toLowerCase().replace(/\.js$/i, '').replace(/[\s\-_]/g, '');
}

export default {
  tokenizeText,
  normalizeSkill,
  STOP_WORDS,
};
