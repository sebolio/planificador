/**
 * Tareas
 * 
 * Esta librería implementa el modelo de la base de datos que mantiene la lista de tareas,
 * utilizando la libería Mongo que es parte de Meteor.
 * 
 * @author sebolio
 * @package seb-as
 * 
 */
import { Mongo } from 'meteor/mongo';
 
export const Tareas = new Mongo.Collection('tareas');
