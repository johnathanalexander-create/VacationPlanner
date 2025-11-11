package com.johnathanalexander.vacationplanner;

import org.reflections.Reflections;
import org.reflections.scanners.MethodAnnotationsScanner;
import org.reflections.scanners.MethodParameterScanner;
import org.reflections.scanners.SubTypesScanner;
import org.reflections.scanners.FieldAnnotationsScanner;
import org.reflections.scanners.TypeAnnotationsScanner;
import org.reflections.util.ClasspathHelper;
import org.reflections.util.ConfigurationBuilder;

import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Constructor;
import java.util.Set;

public class TodoAnnotationScanner {
	
	public static void scan() {
		Reflections reflections = new Reflections(new ConfigurationBuilder()
                .setUrls(ClasspathHelper.forPackage("com.johnathanalexander.vacationplanner"))
                .setScanners(new TypeAnnotationsScanner(), new SubTypesScanner(), new MethodAnnotationsScanner(), new FieldAnnotationsScanner()));


		System.out.println("THE FOLLOWING ARE TODO ITEMS THROUGHOUT THE APPLICATION:");
		System.out.println("-----------------------------------------------------------------------------------------------------");

        // Find classes with @TODO
        Set<Class<?>> annotatedClasses = reflections.getTypesAnnotatedWith(TODO.class);
        printAnnotations(annotatedClasses, "Class");

        // Find methods with @TODO
        Set<Method> annotatedMethods = reflections.getMethodsAnnotatedWith(TODO.class);
        printAnnotations(annotatedMethods, "Method");

        // Find fields with @TODO
        Set<Field> annotatedFields = reflections.getFieldsAnnotatedWith(TODO.class);
        printAnnotations(annotatedFields, "Field");

        // Note: Reflections does not directly support scanning constructors annotated with a custom annotation.
        // You would need to iterate through classes and their constructors manually if needed.
        
        System.out.println("-----------------------------------------------------------------------------------------------------");
	}

    private static <T extends AnnotatedElement> void printAnnotations(Set<T> annotatedElements, String elementType) {
        for (T element : annotatedElements) {
            TODO todoAnnotation = element.getAnnotation(TODO.class);
            if (todoAnnotation != null) {
                System.out.println(elementType + ": " + element.toString() + " - TODO: " + todoAnnotation.value());
            }
        }
    }
}