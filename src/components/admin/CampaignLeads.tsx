import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  ArrowLeft, 
  Download, 
  Search, 
  Mail, 
  Phone, 
  MessageSquare,
  Calendar,
  Filter
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface CampaignLeadsProps {
  campaign: any;
  onBack: () => void;
}

export function CampaignLeads({ campaign, onBack }: CampaignLeadsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');

  const leads = campaign.leads || [];

  // Filter and sort leads
  const filteredLeads = leads
    .filter((lead: any) => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        lead.name.toLowerCase().includes(search) ||
        lead.email.toLowerCase().includes(search) ||
        lead.phone.includes(search)
      );
    })
    .sort((a: any, b: any) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return a.name.localeCompare(b.name);
    });

  const exportToCSV = () => {
    if (leads.length === 0) {
      return;
    }

    const headers = ['Data', 'Nume', 'Email', 'Telefon', 'Mesaj'];
    const rows = leads.map((lead: any) => [
      new Date(lead.createdAt).toLocaleString('ro-RO'),
      lead.name,
      lead.email,
      lead.phone,
      lead.message || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${campaign.slug}-leads-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    if (leads.length === 0) {
      return;
    }

    // Create HTML table for Excel
    const headers = ['Data', 'Nume', 'Email', 'Telefon', 'Mesaj'];
    const rows = leads.map((lead: any) => [
      new Date(lead.createdAt).toLocaleString('ro-RO'),
      lead.name,
      lead.email,
      lead.phone,
      lead.message || ''
    ]);

    const htmlTable = `
      <table>
        <thead>
          <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;

    const blob = new Blob([htmlTable], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${campaign.slug}-leads-${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-[#a594f9]/50 text-[#a594f9] hover:bg-[#a594f9]/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Înapoi
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#e8e6f7]">
            Înscrieri - {campaign.title}
          </h2>
          <p className="text-[#e8e6f7]/70 mt-1">
            {leads.length} {leads.length === 1 ? 'înscriere' : 'înscrieri'} total
          </p>
        </div>
      </div>

      {/* Actions Bar */}
      <Card className="bg-[#16213e] border-[#a594f9]/30 p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#e8e6f7]/50" />
            <Input
              type="text"
              placeholder="Caută după nume, email sau telefon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
            />
          </div>
          
          <div className="flex gap-2 w-full lg:w-auto">
            <Button
              variant="outline"
              onClick={() => setSortBy(sortBy === 'date' ? 'name' : 'date')}
              className="flex-1 lg:flex-none border-[#a594f9]/50 text-[#a594f9] hover:bg-[#a594f9]/10"
            >
              <Filter className="w-4 h-4 mr-2" />
              {sortBy === 'date' ? 'Data' : 'Nume'}
            </Button>
            
            <Button
              variant="outline"
              onClick={exportToCSV}
              disabled={leads.length === 0}
              className="flex-1 lg:flex-none border-[#86A789]/50 text-[#86A789] hover:bg-[#86A789]/10 disabled:opacity-50"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
            
            <Button
              variant="outline"
              onClick={exportToExcel}
              disabled={leads.length === 0}
              className="flex-1 lg:flex-none border-[#86A789]/50 text-[#86A789] hover:bg-[#86A789]/10 disabled:opacity-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Excel
            </Button>
          </div>
        </div>
      </Card>

      {/* Leads Table */}
      {filteredLeads.length === 0 ? (
        <Card className="bg-[#16213e] border-[#a594f9]/30 p-12 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto bg-[#a594f9]/20 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-[#a594f9]" />
            </div>
            <h3 className="text-xl font-semibold text-[#e8e6f7]">
              {searchTerm ? 'Niciun rezultat găsit' : 'Nicio înscriere încă'}
            </h3>
            <p className="text-[#e8e6f7]/70">
              {searchTerm 
                ? 'Încearcă să modifici criteriile de căutare' 
                : 'Înscierile la această campanie vor apărea aici'
              }
            </p>
          </div>
        </Card>
      ) : (
        <Card className="bg-[#16213e] border-[#a594f9]/30 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#a594f9]/20 hover:bg-transparent">
                  <TableHead className="text-[#e8e6f7]/70">Data</TableHead>
                  <TableHead className="text-[#e8e6f7]/70">Nume</TableHead>
                  <TableHead className="text-[#e8e6f7]/70">Email</TableHead>
                  <TableHead className="text-[#e8e6f7]/70">Telefon</TableHead>
                  <TableHead className="text-[#e8e6f7]/70">Mesaj</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead: any) => (
                  <TableRow 
                    key={lead.id}
                    className="border-[#a594f9]/20 hover:bg-[#a594f9]/5"
                  >
                    <TableCell className="text-[#e8e6f7]/70">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#a594f9]" />
                        <span className="text-sm">
                          {new Date(lead.createdAt).toLocaleDateString('ro-RO', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#e8e6f7] font-medium">
                      {lead.name}
                    </TableCell>
                    <TableCell>
                      <a 
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-2 text-[#a594f9] hover:text-[#a594f9]/80"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{lead.email}</span>
                      </a>
                    </TableCell>
                    <TableCell>
                      <a 
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-2 text-[#86A789] hover:text-[#86A789]/80"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{lead.phone}</span>
                      </a>
                    </TableCell>
                    <TableCell className="text-[#e8e6f7]/70 max-w-xs">
                      {lead.message ? (
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-[#a594f9] flex-shrink-0 mt-0.5" />
                          <span className="text-sm line-clamp-2">{lead.message}</span>
                        </div>
                      ) : (
                        <span className="text-[#e8e6f7]/40 text-sm italic">Fără mesaj</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}
