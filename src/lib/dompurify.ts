import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
// @ts-ignore
const DOMPurify = createDOMPurify(window);

export { DOMPurify };