package Zadanie1;

import java.util.Scanner;
import java.util.concurrent.TimeUnit;

public class main {

	public static void main(String args[]) 
	{
		Scanner scan = new Scanner(System.in);
		String wybor;
		
		System.out.println("Podaj liczbe watkow ktora bedziesz potrzebowal\n");
		int N = Integer.parseInt(scan.nextLine());
		
		while(true)
		{
			
			
			System.out.println("Ktory podpunkt zadania wykonac:\n1. Podpunkt #1\n2. Podpunkt #2\n3. Podpunkt #3\n4. Koniec Programu");
			wybor = scan.nextLine();
			
			switch(wybor)
			{
			case "1":
				RunnableZadanie1 r1 = new RunnableZadanie1(1);
				for(int i=0;i<N;i++)
				{
					Thread t= new Thread(r1);
					t.setName(String.valueOf(i));
					t.start();
				}
				try
				{
					TimeUnit.SECONDS.sleep((long)(0.2*N));
				}
				catch(InterruptedException ex)
				{
				    Thread.currentThread().interrupt();
				}
				
				break;
				
			case "2":
				System.out.println("Podaj liczbe repetetywnosci petli watku\n");
				int p = Integer.parseInt(scan.nextLine());
				RunnableZadanie1 r2 = new RunnableZadanie1(p);
				for(int i=0;i<N;i++)
				{
					Thread t= new Thread(r2);
					t.setName(String.valueOf(i));
					t.start();
				}
				try
				{
					TimeUnit.SECONDS.sleep((long)(0.2*N*p));
				}
				catch(InterruptedException ex)
				{
				    Thread.currentThread().interrupt();
				}
				break;
				
			case "3":
				RunnableZadanie1 r3 = new RunnableZadanie1(-1);
				for(int i=0;i<N;i++)
				{
					Thread t= new Thread(r3);
					t.setName(String.valueOf(i));
					t.start();
				}
				break;
			case "4":
				scan.close();
				System.exit(0);
				break;
			default:
				System.out.println("Niewlasciwy wybor");
				break;
			}
		}
	}
}
