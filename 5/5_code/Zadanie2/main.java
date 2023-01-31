package Zadanie2;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;
import java.io.*; 
import java.util.*; 
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;


public class main {
	public static void main(String args[]) 
	{
		Scanner scan = new Scanner(System.in);
		System.out.println("Podaj liczbe pisarzy W");
		int W = Integer.parseInt(scan.nextLine());
		System.out.println("Podaj liczbe czytelnikow R");
		int R = Integer.parseInt(scan.nextLine());
		System.out.println("Podaj liczbe ksiazek do napisania B");
		int B = Integer.parseInt(scan.nextLine());
		BlockingQueue<String> queue = new ArrayBlockingQueue<>(1);
		AtomicInteger zarezerwowaneKsiazki = new AtomicInteger(0);
		AtomicInteger gotoweKsiazki = new AtomicInteger(0);
		AtomicInteger wypozyczoneKsiazki = new AtomicInteger(0);
		Vector<Integer> ksiazki = new Vector<Integer>(B);
		System.out.println("Rozpoczyna sie symulacja!");
		Pisarz pisarz = new Pisarz(zarezerwowaneKsiazki,gotoweKsiazki,ksiazki,B,1,queue);
		Czytelnik czytelnik = new Czytelnik(gotoweKsiazki,ksiazki,B,1,queue);
		for(int i=0;i<W;i++)
		{
			Thread t = new Thread(pisarz);
			t.start();
			t.setName(String.valueOf(i+pisarz.ID));
		}
		for(int i=0;i<R;i++)
		{
			Thread t = new Thread(czytelnik);
			t.start();
			t.setName(String.valueOf(i+czytelnik.ID));
		}
		
		
		scan.close();
	}
}
