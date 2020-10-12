/* ============================================
 ; Title:  employee.interface.ts
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   7 October 2020
 ; Description: home component
 =============================================
*/

import { Item } from './item.interface';

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
}
